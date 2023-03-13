import ErrorComponent from "../../components/Error/ErrorComponent";
import React, { useState, useEffect } from "react"

const ErrorPage = () => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      fetch("/api/error")
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  }, []);

  return (
    <ErrorComponent/>
  )
}

export default ErrorPage;