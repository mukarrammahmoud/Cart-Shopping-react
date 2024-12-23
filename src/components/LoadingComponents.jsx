

function LoadingComponent() {
    return <div className="flex items-center justify-center h-screen bg-gradient-to-r">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full border-4 border-t-4 border-cyan-200 w-16 h-16 mb-4"></div>
        <p className="text-2xl font-extrabold  animate-pulse">Loading...</p>
      </div>
    </div>;
  }
  
  export default LoadingComponent;