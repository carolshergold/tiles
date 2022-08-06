import '../App.css';


export default function StreakPanel({ currentStreak, longestStreak, userMessage }) {

  return(
  <div className="combo">
    <div className="combo-label">Current combo:  <br />
      <span className = "streak-length">{currentStreak} </span>
    </div>
    <div className = "combo-label">Longest combo:  <br />
      <span className = "streak-length">{longestStreak} </span>
    </div>
    <div className="user-message">{userMessage}</div>
  </div>
  )
};