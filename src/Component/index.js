/**
 * Summary. A simple Progress Indicator that displays a backdrop and spinner via trigger functions
 * 
 *  Exports a ProgressIndicatorProvider that renders the spinner as well as provides trigger controls to children.
 *  Child components consuming the context can call two methods:
 *      context.signalLoading() - increments the active loading count
 *      context.signalLoaded() - decrements the active loading count
 *  When active loading count is zero, loading backdrop disappears
 *  When active loading count is greater than zero, backdrop appears.
 */

import { Backdrop, CircularProgress } from '@material-ui/core';
import React, { useContext } from 'react';

const ProgressIndicatorStateContext = React.createContext({}); // Contains state - used only by internal loader 
const ProgressIndicatorControllerContext = React.createContext({}); // Contains functions that update state - used by children

const ProgressIndicatorController = (props) => (
    <ProgressIndicatorControllerContext.Consumer>
        {props.children}
    </ProgressIndicatorControllerContext.Consumer>
);

const ProgressIndicator = () => (
    <ProgressIndicatorStateContext.Consumer>
        {loader => (
            <Backdrop
                style={{
                    zIndex: 9999,
                    color: '#00D8FE',
                    position: "absolute"
                }}
                open={loader} >
                <CircularProgress color="inherit" />
            </Backdrop>
        )}
    </ProgressIndicatorStateContext.Consumer>
);
class ProgressIndicatorProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingCount: 0,
            isLoading: false,
            controllers: {
                signalLoading: this.signalLoading,
                signalLoaded: this.signalLoaded,
            }
        };
    }
    signalLoading = () => {
        this.setState((prevState) => {
            const newCount = prevState.loadingCount + 1
            return {
                ...prevState,
                loadingCount: newCount,
                isLoading: newCount > 0
            }
        });
    }
    signalLoaded = () => {
        this.setState((prevState) => {
            const newCount = (prevState.loadingCount === 0) ? 0 : prevState.loadingCount - 1
            return {
                ...prevState,
                loadingCount: newCount,
                isLoading: newCount > 0
            }
        });
    }

    render() {
        // Nested Providers is necessary to prevent consumer components from re-rendering if they only need to "update" the data.
        return (
            <ProgressIndicatorControllerContext.Provider value={this.state.controllers}>
                <ProgressIndicatorStateContext.Provider value={this.state.isLoading}>
                    <ProgressIndicator />
                </ProgressIndicatorStateContext.Provider>
                {this.props.children}
            </ProgressIndicatorControllerContext.Provider>
        );
    }
};

const withProgressIndicator = Component => class Contextual extends React.PureComponent {
    static contextType = ProgressIndicatorControllerContext;
    render() {
        return (
            <Component {...this.props} loader={this.context} />
        )
    }
}

const useProgressIndicator = () => { return useContext(ProgressIndicatorControllerContext) }

export {
    withProgressIndicator,
    useProgressIndicator,
    ProgressIndicatorController,
};
export default ProgressIndicatorProvider;