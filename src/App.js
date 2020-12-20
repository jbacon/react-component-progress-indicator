import './App.css';
import ProgressIndicatorProvider, { ProgressIndicatorController } from "./Component"

function App() {
  return (
    <div>
      <div style={{ height: "50vh", backgroundColor: "red"}}>
        <ProgressIndicatorProvider>
          Demo Full Screen (2 second timeout)
          <MyDemo />
        </ProgressIndicatorProvider>
      </div>
      {/* Notice 'position: "relative"', necessary for scoping backdrop to parent container */}
      <div style={{ height: "50vh", position: "relative", backgroundColor: "grey" }}>
        <ProgressIndicatorProvider>
          Demo Container (2 second timeout)
          <MyDemo />
        </ProgressIndicatorProvider>
      </div>
    </div>
  );
}

function MyDemo() {

  const handleSubmit = (progressIndicatorController) => (event) => {
    event.preventDefault();
    progressIndicatorController.signalLoading();
    // Replace with app logic
    window.setTimeout(() => {
      progressIndicatorController.signalLoaded();
    }, 2000);
  }

  return (
    <ProgressIndicatorController>
      {progressIndicatorController => (
        <form onSubmit={handleSubmit(progressIndicatorController)}>
          <input type="submit" value="Try Me" />
        </form>
      )}
    </ProgressIndicatorController>
  )
}

export default App;
