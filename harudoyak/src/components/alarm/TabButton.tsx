import React from "react";

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  label: string;
}

const TabButton: React.FC<TabButtonProps> = ({ isActive, onClick, label }) => {
  return (
    <button
      style={{
        flex: "1",
        width: "174px",
        height: "59px",
        padding: "5px 3px",
        backgroundColor: isActive ? "#3C7960" : "#A5CBBC",
        color: "#ffffff",
        border: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        borderRadius: "20px",
        marginRight: "10px",
        fontWeight: 900,
        fontSize: "18px",
        fontFamily: "Inter, sans-serif",
      }}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default TabButton;
