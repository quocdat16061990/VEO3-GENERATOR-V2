import axios from "axios";
import { N8N_WEBHOOK_URL, API_CONFIG } from "@/constants";

// Tạo axios instance với config mặc định
const axiosInstance = axios.create({
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor để log requests
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`📤 Request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error(`❌ Axios Request Error:`, error);
    return Promise.reject(error);
  }
);

// Interceptor để log responses
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`✅ Response from: ${response.config.url}`, response.status);
    return response;
  },
  (error) => {
    console.error(`❌ Axios Response Error:`, error.message);
    if (error.response) {
      console.error(`📊 Status: ${error.response.status}`);
      console.error(`📄 Data:`, error.response.data);
    }
    return Promise.reject(error);
  }
);

/**
 * Gọi n8n webhook để tạo video từ prompt
 * @param {string} prompt - Prompt text để tạo video
 * @param {Object} settings - User settings (duration, resolution, aspectRatio)
 * @returns {Promise<string>} - URL của video (blob URL hoặc Google Drive URL)
 */
export const generateVideo = async (prompt, settings = {}) => {
  if (!N8N_WEBHOOK_URL) {
    throw new Error(
      "VITE_N8N_WEBHOOK_URL chưa được cấu hình. Vui lòng tạo file .env với nội dung:\n" +
        "VITE_N8N_WEBHOOK_URL=https://veo3.anhlaptrinh.vn/webhook/generate-video"
    );
  }

  try {
    const payload = {
      prompt: prompt,
      timestamp: Math.floor(Date.now() / 1000),
      duration: settings.duration || API_CONFIG.DEFAULT_SETTINGS.duration,
      resolution: settings.resolution || API_CONFIG.DEFAULT_SETTINGS.resolution,
      aspectRatio: settings.aspectRatio || API_CONFIG.DEFAULT_SETTINGS.aspectRatio,
    };

    console.log("📤 Sending request to n8n webhook:", payload);

    const startTime = Date.now();

    // Request với responseType arraybuffer để nhận cả JSON và binary
    const response = await axiosInstance.post(N8N_WEBHOOK_URL, payload, {
      responseType: "arraybuffer", // Accept both binary and text
    });

    const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`⏱️ Request completed in ${elapsedTime}s`);

    // Check if response is binary video data
    const contentType = response.headers["content-type"] || "";
    const dataSize = response.data.byteLength || 0;

    // Nếu content-type là video hoặc size lớn hơn 1MB (có thể là video file)
    const isVideoFile =
      contentType.startsWith("video/") ||
      contentType === "application/octet-stream" ||
      (dataSize > 1024 * 1024 && !contentType.includes("json")); // > 1MB và không phải JSON

    if (isVideoFile && response.data && dataSize > 0) {
      // Response là binary video file
      console.log("📹 Received binary video file");
      const blob = new Blob([response.data], {
        type: contentType || "video/mp4",
      });
      const blobUrl = URL.createObjectURL(blob);
      return blobUrl;
    }

    // Try to parse as JSON (for Google Drive URL or JSON metadata)
    try {
      const textDecoder = new TextDecoder("utf-8");
      const jsonText = textDecoder.decode(response.data);
      const responseData = JSON.parse(jsonText);

      console.log("📄 Received JSON response:", responseData);

      // Nếu là array, lấy item đầu tiên
      let driveFile = null;
      if (Array.isArray(responseData) && responseData.length > 0) {
        driveFile = responseData[0];
      } else if (typeof responseData === "object" && responseData !== null) {
        driveFile = responseData;
      } else if (typeof responseData === "string") {
        // Nếu là string URL trực tiếp
        return responseData;
      }

      if (!driveFile || typeof driveFile !== "object") {
        throw new Error(
          "Response từ n8n không hợp lệ. Vui lòng kiểm tra n8n workflow."
        );
      }

      // Check if response contains file metadata instead of webViewLink
      if (driveFile.mimeType && driveFile.fileName && !driveFile.webViewLink) {
        throw new Error(
          `N8n đang trả về JSON metadata (${driveFile.fileName}) nhưng không có file binary. ` +
            `Vui lòng cập nhật n8n "Respond to Webhook" node: ` +
            `- "Respond With" = "Last Node Output" (hoặc node có binary data) ` +
            `- Đảm bảo node trước đó có binary file output.`
        );
      }

      // Nếu có webViewLink, trả về như bình thường
      const videoUrl = driveFile.webViewLink;
      const videoName =
        driveFile.name ||
        driveFile.originalFilename ||
        driveFile.fileName;

      if (!videoUrl) {
        throw new Error(
          `Response từ n8n không có webViewLink. ` +
            `Nếu n8n đang trả về file, hãy đảm bảo "Respond to Webhook" node trả về binary file (không phải JSON). ` +
            `Nếu n8n đang trả về Google Drive URL, hãy đảm bảo có field "webViewLink" trong response.`
        );
      }

      console.log(`✅ Video URL received: ${videoName || videoUrl}`);
      return videoUrl;
    } catch (parseError) {
      // Nếu JSON parse fails, có thể là binary data
      // Nếu size lớn (> 100KB) và không phải JSON text, xử lý như binary
      if (dataSize > 100 * 1024) {
        console.log("📹 Treating response as binary video file");
        const blob = new Blob([response.data], {
          type: contentType || "video/mp4",
        });
        const blobUrl = URL.createObjectURL(blob);
        return blobUrl;
      }

      // Nếu parse error và không phải binary, throw error
      throw new Error(
        `Response từ n8n không hợp lệ: ${parseError.message}. Vui lòng kiểm tra n8n workflow.`
      );
    }
  } catch (error) {
    console.error("\n❌ LỖI KHI GỌI N8N WEBHOOK:");
    
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        console.error("⏱️ TIMEOUT: Quá trình xử lý mất hơn 15 phút");
        throw new Error(
          "Timeout: Quá trình xử lý mất hơn 15 phút. Vui lòng thử lại với prompt ngắn hơn."
        );
      }
      if (error.response) {
        console.error(`📊 Status: ${error.response.status}`);
        console.error(`📄 Response:`, error.response.data);
        throw new Error(
          `Request error: ${error.message} (Status: ${error.response.status})`
        );
      }
      throw new Error(`Request error: ${error.message}`);
    }
    
    if (error instanceof Error) {
      console.error(`❌ Error: ${error.message}`);
      throw error;
    }
    
    throw new Error("Unknown error occurred");
  }
};

