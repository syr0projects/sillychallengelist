import { useEffect, useState } from "react";

function App() {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/challenges")
      .then(res => res.json())
      .then(data => setChallenges(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Silly Challenge List</h1>
      <table border="1" cellPadding="5" style={{ width: "100%", textAlign: "center" }}>
        <thead>
          <tr>
            <th>Level ID</th>
            <th>Placement</th>
            <th>Video</th>
            <th>Records</th>
            <th>Creator</th>
            <th>Verifier</th>
            <th>Publisher</th>
            <th>Victors</th>
          </tr>
        </thead>
        <tbody>
          {challenges.map(ch => (
            <tr key={ch.id}>
              <td>{ch.id}</td>
              <td>{ch.placement}</td>
              <td>
                <iframe
                  width="200"
                  height="113"
                  src={ch.video}
                  title="Video Preview"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </td>
              <td>{ch.records}</td>
              <td>{ch.creator}</td>
              <td>{ch.verifier}</td>
              <td>{ch.publisher}</td>
              <td>{ch.victors}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
