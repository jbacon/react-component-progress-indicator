import './App.css';
import ProgressIndicatorProvider, { ProgressIndicatorControllerContext } from "./Component"

function App() {
  return (
    <div>
      <div style={{ height: "50vh", backgroundColor: "red"}}>
        <ProgressIndicatorProvider>
          Demo Full Screen:
          <MyDemo />
        </ProgressIndicatorProvider>
      </div>
      <div style={{ height: "50vh", position: "relative", backgroundColor: "grey" }}>
        <ProgressIndicatorProvider>
          Demo Container:
          <MyDemo />
        </ProgressIndicatorProvider>
      </div>
    </div>
  );
}

function MyDemo() {

  const handleSubmit = (loader) => (event) => {
    event.preventDefault();
    loader.signalLoading();
    // Replace with app logic
    window.setTimeout(() => {
      loader.signalLoaded();
    }, 2000);
  }

  return (
    <ProgressIndicatorControllerContext.Consumer>
      {loader => (
        <form onSubmit={handleSubmit(loader)}>
          <input type="submit" value="Try Me" />
        </form>
      )}
    </ProgressIndicatorControllerContext.Consumer>
  )
}

export default App;
