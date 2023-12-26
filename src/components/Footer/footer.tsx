import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="information">
        <div className="textStyle3">Choco pap</div>
        <div className="textStyle4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua
        </div>
      </div>
      <div className="contact">
        <div className="textStyle3">Contact</div>
        <div className="textStyle4">
          Adresse : 51 rue du chocolat 75000 Paris Téléphone: 01 23 45 67 89
          Horaires: 9h00-17h00 du Lundi au vendredi
        </div>
      </div>
      <div className="socialMedia">
        <div>
          <img
            src="/images/logo-facebook.png"
            width={40}
            height={40}
            alt="facebook"
          />
        </div>
        <div>
          <img
            src="/images/logo-instagram.jpeg"
            width={40}
            height={40}
            alt="instagram"
          />
        </div>
        <div>
          <img
            src="/images/logo-twitter.png"
            width={40}
            height={40}
            alt="twitter"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
