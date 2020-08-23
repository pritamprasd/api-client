import React, { Component } from 'react';
import './RequestParentComponent.css'
import Axios from "axios";

export interface Props {
    name: string;
}

interface State {
    url: string;
    verb: string;
    response: string;
    responseHeader: string;
}

interface ResponseHeader{    
}

class RequestParentComponent extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            url: "",
            response: "",
            verb: "none",
            responseHeader: "",
        }
        this.sendRequest = this.sendRequest.bind(this);
        this.setUrl = this.setUrl.bind(this);
        this.setResponse = this.setResponse.bind(this);
        this.setVerb = this.setVerb.bind(this);
        this.setResponseHeaders = this.setResponseHeaders.bind(this);
    }

    setUrl(u: string) {
        this.setState({
            url: u
        });
    }
    setResponse(r: string) {
        this.setState({
            response: r
        });
    }

    sendRequest() {
        if (isValidUrl(this.state.url)) {
            console.log("Calling : " + getNormalizedUrl(this.state.url))
            let config = {
                headers: {
                }
            };
            const requestBody = {
                "method": "GET",
                "url": getNormalizedUrl(this.state.url),
            };
            Axios.post(
                backendServiceSingleApiExeUrl,
                requestBody,
                config
            ).then(res => {
                this.setResponse(JSON.stringify(res.data))
                this.setResponseHeaders(res.headers)
            }).catch((e) => console.error(e));
        } else {
            console.log("Invalid url: " + this.state.url);
        }
    }
    setResponseHeaders(o: object) {
        this.setState({
            responseHeader: JSON.stringify(o)
        });
        console.log("Headers : " + JSON.stringify(o))
    }
    setVerb(v: string) {
        this.setState({
            verb: v
        });
        console.log("Verb changed: " + v)
    }
    render() {
        return (
            <div>
                <div id="input">
                    <select name="verbs" id="httpverbs" onChange={e => this.setVerb(e.target.value)}>
                        <option value="get">GET</option>
                        <option value="post">POST</option>
                        <option value="put">PUT</option>
                        <option value="delete">DELETE</option>
                        <option value="options">OPTIONS</option>
                        <option value="head">HEAD</option>
                        <option value="graphql">GraphQL</option>
                    </select>
                        URL:
                        <input placeholder="api server url" type="url" value={this.state.url} onChange={e => this.setUrl(e.target.value)} required />
                    <input type="button" value="Send" onClick={this.sendRequest} />
                </div>
                <div id="output">
                    <label id="apiOutputResponseBody">{this.state.response}</label>
                    <hr/>
                    <label id="apiOutputResponseHeader">{this.state.responseHeader}</label>
                </div>
            </div>
        );
    }
}

function isValidUrl(s: string): boolean {
    let valid = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(s);
    return valid;
}

function getNormalizedUrl(s: string): string {
    return s.search("http") === -1 ? "http://" + s : s;
}

export default RequestParentComponent;
const backendServiceSingleApiExeUrl = "http://localhost:8110/api";