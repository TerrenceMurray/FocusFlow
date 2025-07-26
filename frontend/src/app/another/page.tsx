
export default async function TestPage () {
    return <div>
        <h1>Test Page</h1>
        <p>{process.env.TEST ?? "None"}</p>
    </div>;
}