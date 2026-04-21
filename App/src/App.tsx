import React from 'react';

import GeometryCanvas from './components/GeometryCanvas';
import TopBar from './components/TopBar';
import Inspector from './components/Inspector';
import Timeline from './components/Timeline';
import { useStore } from './store/useStore';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import Player from './components/Player';
import LandingPage from './components/LandingPage';
import { supabase } from './supabaseClient';

const App: React.FC = () => {
  // useAnimation(); // Moved to GeometryCanvas internally
  const currentView = useStore(s => s.currentView);
  const undo = useStore(s => s.undo);
  const redo = useStore(s => s.redo);

  // --- Resizing Logic (Timeline) ---
  const [timelineHeight, setTimelineHeight] = React.useState(300);
  const [isResizingTimeline, setIsResizingTimeline] = React.useState(false);
  const timelineRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizingTimeline) {
        // Calculate new height based on mouse position from bottom of screen
        // But the layout splits the main area.
        // It's easier to calculate top of timeline vs screen height.
        // Or essentially: appHeight - mouseY - (status bar etc if exists?)
        // The main container fills screen.
        // The timeline is at the bottom of the left column.
        // Height = window.innerHeight - e.clientY
        const newHeight = Math.max(150, Math.min(window.innerHeight - 100, window.innerHeight - e.clientY));
        setTimelineHeight(newHeight);
      }
    };

    const handleMouseUp = () => {
      if (isResizingTimeline) {
        setIsResizingTimeline(false);
      }
    };

    if (isResizingTimeline) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'row-resize';
    } else {
      document.body.style.cursor = '';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
    };
  }, [isResizingTimeline]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Undo: Command/Ctrl + Z
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      // Redo: Command/Ctrl + Shift + Z
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && e.shiftKey) {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  // Auth Listener
  React.useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      useStore.getState().setUser(session);

      if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
        if (useStore.getState().currentView === 'landing' && session) {
          useStore.getState().setView('dashboard');
        }
      }
      if (event === 'SIGNED_OUT') {
        useStore.getState().setView('landing');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (currentView === 'dashboard') return <Dashboard />;
  if (currentView === 'admin') return <AdminDashboard />;
  if (currentView === 'player') return <Player />;
  if (currentView === 'landing') return <LandingPage />;

  return (
    <div className="h-screen w-screen bg-[#1a1a1a] text-white flex flex-col font-sans selection:bg-[#D4AF37]/30">
      <TopBar />

      <main className="flex-1 flex overflow-hidden relative">
        {/* Left Column: Canvas + Timeline */}
        <div className="flex-1 flex flex-col min-w-0 border-r border-white/10 min-h-0 relative z-0">
          <div className="flex-1 relative bg-black min-h-0 overflow-hidden">
            <GeometryCanvas />
          </div>

          <div
            ref={timelineRef}
            style={{ height: timelineHeight }}
            className="min-h-[150px] border-t border-white/10 flex flex-col bg-[#252525] relative z-20"
          >
            {/* Resize Handle */}
            <div
              className="absolute top-0 left-0 right-0 h-1 cursor-row-resize hover:bg-[#D4AF37] z-50 transition-colors opacity-0 hover:opacity-100"
              onMouseDown={(e) => {
                e.stopPropagation();
                setIsResizingTimeline(true);
              }}
            />
            <div className="flex-1 flex overflow-hidden">
              <Timeline />
            </div>
          </div>
        </div>

        {/* Right Column: Inspector */}
        <aside className="w-[320px] bg-[#252525] border-l border-white/10 overflow-y-auto relative z-20">
          <Inspector />
        </aside>
      </main>
    </div>
  );
};

export default App;
