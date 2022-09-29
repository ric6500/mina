

function MotokoButton() {
  const handleClick = () => {
    window.open("https://m7sm4-2iaaa-aaaab-qabra-cai.raw.ic0.app/");
  };
  return(
    <div style={{
        display: 'inline-grid',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <button style={{
          minWidth: "200px",
          maxWidth: "300px",
          height: "60px",
        }} onClick={handleClick}>Motoko

        </button>
        </div>
    );
}

function DeveloperPage() {

  return (<div>
    <p style={{
        fontSize: "21px",
      }}>You can now develop apps directly in the browser using the Motoko programming language, this saves you time in writing new services and deploy them directly on the internet computer. Without going through long review processes on the stores and without needing to switch between different code editors!</p>
    <MotokoButton/>
  </div>);
}

export default DeveloperPage;
