import { Sidebar } from "./Sidebar"
import { Header } from "./Header"

// #region agent log
const log = (location, message, data) => {
  fetch('http://127.0.0.1:7244/ingest/f2c7b3d4-ae51-4d6c-84c0-861ab6640502', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      location,
      message,
      data: data || {},
      timestamp: Date.now(),
      sessionId: 'debug-session',
      runId: 'run1',
      hypothesisId: 'A'
    })
  }).catch(() => {});
};
// #endregion

export function MainLayout({ children, selectedMenuId = "AssetManagementMaterial", onMenuChange }) {
  // #region agent log
  log('MainLayout.jsx:18', 'MainLayout render', { selectedMenuId });
  // #endregion

  return (
    <div 
      className="h-screen w-screen flex flex-col overflow-hidden bg-white"
    >
      <div className="flex flex-1 overflow-hidden">
        <Sidebar selectedId={selectedMenuId} onMenuChange={onMenuChange} />
        <div className="flex-1 flex flex-col overflow-hidden relative w-full min-w-0">
          <Header />
          <main className="flex-1 overflow-y-auto overflow-x-hidden w-full min-h-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

