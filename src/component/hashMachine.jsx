import React, { useEffect, useState } from "react";

const SHA256Hash = ({ data }) => {
  const [hash, setHash] = useState("");

  useEffect(() => {
    const generateHash = async () => {
      const encoder = new TextEncoder();
      const dataBuffer = encoder.encode(data);
      const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      setHash(hashHex);
    };

    if (data) {
      generateHash();
    }
  }, [data]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md w-full">
      <strong>SHA-256 Hash:</strong> {hash || "No data provided"}
    </div>
  );
};

export default SHA256Hash;
