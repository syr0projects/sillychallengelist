import { useEffect, useState } from "react"

const API_URL = "https://working-worker.gdfdlmanager.workers.dev"

function App() {
  const [challenges, setChallenges] = useState([])
  const [form, setForm] = useState({
    id: "",
    placement: "",
    video: "",
    records: "",
    creator: "",
    verifier: "",
    publisher: "",
    victors: ""
  })

  useEffect(() => {
    fetch(`${API_URL}/challenges`)
      .then(res => res.json())
      .then(data => setChallenges(data))
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch(`${API_URL}/challenges`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
    setForm({ id: "", placement: "", video: "", records: "", creator: "", verifier: "", publisher: "", victors: "" })
    const res = await fetch(`${API_URL}/challenges`)
    const data = await res.json()
    setChallenges(data)
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Silly Challenge List</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        {Object.keys(form).map(key => (
          <input
            key={key}
            name={key}
            placeholder={key}
            value={form[key]}
            onChange={handleChange}
            style={{ marginRight: "5px", marginBottom: "5px" }}
          />
        ))}
        <button type="submit">Add Challenge</button>
      </form>

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
  )
}

export default App
