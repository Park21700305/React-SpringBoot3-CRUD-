import "../../css/footer.css";

function Footer() {
  return (
    <footer className="py-4 bg-dark text-light footer">
      <div className="container text-center">
        <ul className="nav justify-content-center mb-1"></ul>
        <h5 style={{ color: "grey" }}>
          <>Copyright &copy; ParkJiSung</>
        </h5>
      </div>
    </footer>
  );
}

export default Footer;
