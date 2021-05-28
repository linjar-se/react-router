import React, { lazy, Suspense } from "react";
import { hot } from "react-hot-loader/root";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar";

const Home = lazy(() => import("./routes/home"));
const Settings = lazy(() => import("./routes/settings"));

function App(): JSX.Element {
    return (
        <Router>
            <Navbar />
            <div className="container mx-auto pt-8 px-4">
                <Suspense fallback={<div>Loading ...</div>}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/settings" component={Settings} />
                    </Switch>
                </Suspense>
            </div>
        </Router>
    );
}

export default hot(App);
