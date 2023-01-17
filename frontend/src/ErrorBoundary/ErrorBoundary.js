import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
        }
    }

    componentDidCatch(error, errorInfo) {
        console.log(error,errorInfo);
    }

    static getDerivedStateFromError(error) {
     return {error}   
    }

    render() {
        if(this.state.error) {
            return <div>
                Something went wrong...
            </div>
        }

        return this.props.children;
    }
}

export default ErrorBoundary