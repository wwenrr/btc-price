import { useContext } from "react";
import { ThemeContext } from "@/component/ThemeContext";

export function TimeFrame({ time, cur, setTime }: { time: string, cur: string, setTime: any }) {
  const isActive = time === cur;
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error("useContext phải được dùng bên trong ThemeContext.Provider");
  }

  const { theme } = context;

  return (
    <div
      onClick={() => setTime(time)}
      style={{
        padding: 10,
        borderRadius: "100%",
        background: isActive
          ? theme
            ? "linear-gradient(to bottom, #FF4D4D, #FF9999)"  // Sáng -> Đỏ nhạt
            : "linear-gradient(to bottom, #CC0000, #FF4D4D)" // Tối -> Đỏ đậm hơn
          : theme
            ? "linear-gradient(to bottom, #A9D7FF, #007BFF)"  // Sáng -> Xanh nhạt
            : "linear-gradient(to bottom, #004080, #0059b3)", // Tối -> Xanh đậm hơn
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        cursor: "pointer",
        transition: "background 0.3s ease-in-out" // Hiệu ứng đổi màu mượt hơn
      }}
    >
      <span style={{ fontSize: "90%", color: "white", fontWeight: "bold" }}>{time}</span>
    </div>
  );
}
