import {Link} from "react-router-dom";

export function SourcesPage(){
    return <div className="sources-page">
    <ul>
        <li><Link target="_blank" to="/sample-form">Sample form</Link></li>
        <li><a target="_blank" href="https://github.com/kokkinn/requests-management-system">Source code</a></li>
    </ul>
    </div>
}
