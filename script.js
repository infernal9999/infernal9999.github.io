// script.js
const { Component } = React;
const { render } = ReactDOM;
const styled = styled.default;

const familyData = [
  {
    "NAME": "NABADWIP ROY",
    "SEX": "MALE",
    "FATHER": "NA",
    "MOTHER": "NA",
    "DOB": "NA",
    "WIFE": "NA",
    "CHILDREN": ["CHADRAKUMAR ROY"]
  },
  {
    "NAME": "CHADRAKUMAR ROY",
    "SEX": "MALE",
    "FATHER": "NABADWIP ROY",
    "MOTHER": "NA",
    "DOB": "NA",
    "WIFE": "NA",
    "CHILDREN": ["KHAGENDRACHANDRA ROY", "NAGENDRACHANDRA ROY", "MONOROMA ROY", "SHAMDASI ROY"]
  },
  {
    "NAME": "NAGENDRACHANDRA ROY",
    "SEX": "MALE",
    "FATHER": "CHADRAKUMAR ROY",
    "MOTHER": "NA",
    "DOB": "NA",
    "WIFE": "BOKUL BALA ROY",
    "CHILDREN": ["KALPANA SARKAR (ROY)", "ARCHNA DUTTA (ROY)", "SWAPAN ROY", "SOVA SARKAR (ROY)", "TAPAN ROY", "SRIKRISHNA ROY", "RATAN ROY", "PUTUL MAJUMDAR (ROY)", "PURNIMA ADHIKARY (ROY)"]
  },
  {
    "NAME": "BOKUL BALA ROY",
    "SEX": "FEMALE",
    "FATHER": "NA",
    "MOTHER": "NA",
    "DOB": "NA",
    "HUSBAND": "NAGENDRACHANDRA ROY",
    "CHILDREN": ["KALPANA SARKAR (ROY)", "ARCHNA DUTTA (ROY)", "SWAPAN ROY", "SOVA SARKAR (ROY)", "TAPAN ROY", "SRIKRISHNA ROY", "RATAN ROY", "PUTUL MAJUMDAR (ROY)", "PURNIMA ADHIKARY (ROY)"]
  },
  {
    "NAME": "KALPANA SARKAR (ROY)",
    "SEX": "FEMALE",
    "FATHER": "NAGENDRACHANDRA ROY",
    "MOTHER": "BOKUL BALA ROY",
    "DOB": "01/10/1950",
    "HUSBAND": "ANIL SARKAR",
    "CHILDREN": ["ANUP SARKAR", "AVIJIT SARKAR"]
  },
  {
    "NAME": "ARCHNA DUTTA (ROY)",
    "SEX": "FEMALE",
    "FATHER": "NAGENDRACHANDRA ROY",
    "MOTHER": "BOKUL BALA ROY",
    "DOB": "NA",
    "HUSBAND": "BRAJALAL DUTTA",
    "CHILDREN": ["PAPIA DUTTA", "BOBITA DUTTA", "MITA SAHA"]
  },
  {
    "NAME": "SWAPAN ROY",
    "SEX": "MALE",
    "FATHER": "NAGENDRACHANDRA ROY",
    "MOTHER": "BOKUL BALA ROY",
    "DOB": "NA",
    "WIFE": "SABITA ROY",
    "CHILDREN": ["SARAJIT ROY", "RAJA ROY"]
  },
  {
    "NAME": "SABITA ROY",
    "SEX": "FEMALE",
    "FATHER": "NA",
    "MOTHER": "NA",
    "DOB": "NA",
    "HUSBAND": "SWAPAN ROY",
    "CHILDREN": ["SARAJIT ROY", "RAJA ROY"]
  },
  {
    "NAME": "SOVA SARKAR (ROY)",
    "SEX": "FEMALE",
    "FATHER": "NAGENDRACHANDRA ROY",
    "MOTHER": "BOKUL BALA ROY",
    "DOB": "NA",
    "HUSBAND": "ARUN SARKAR",
    "CHILDREN": ["PIKLU SARKAR"]
  },
  {
    "NAME": "TAPAN ROY",
    "SEX": "MALE",
    "FATHER": "NAGENDRACHANDRA ROY",
    "MOTHER": "BOKUL BALA ROY",
    "DOB": "NA",
    "WIFE": "CHANDANA ROY (MAJUMDER)",
    "CHILDREN": ["TANUJA BISWAS (ROY)", "SOMA BISWAS (ROY)", "SUVENDU ROY"]
  },
  {
    "NAME": "CHANDANA ROY (MAJUMDER)",
    "SEX": "FEMALE",
    "FATHER": "KRISHNAPADA MAJUMDER",
    "MOTHER": "SHEFALI MAJUMDER",
    "DOB": "NA",
    "HUSBAND": "TAPAN ROY",
    "CHILDREN": ["PURNALAMI MAJUMDER", "MANTU MAJUMDER", "ANJALI MAJUMDER", "PUTUL MAJUMDER", "CHANDANA MAJUMDER", "SUBHAS MAJUMDER", "LILIMA MAJUMDER"]
  },
  {
    "NAME": "SRIKRISHNA ROY",
    "SEX": "MALE",
    "FATHER": "NAGENDRACHANDRA ROY",
    "MOTHER": "BOKUL BALA ROY",
    "DOB": "27/01/1965",
    "WIFE": "NITAMBINI ROY",
    "CHILDREN": ["SANTANU ROY", "DIPTANU ROY"]
  },
  {
    "NAME": "NITAMBINI ROY",
    "SEX": "FEMALE",
    "FATHER": "KUNJABIHARI BALA",
    "MOTHER": "NONIPROVA BALA",
    "DOB": "08/01/1968",
    "HUSBAND": "SRIKRISHNA ROY",
    "CHILDREN": ["SANTANU ROY", "DIPTANU ROY"]
  },
  {
    "NAME": "RATAN ROY",
    "SEX": "MALE",
    "FATHER": "NAGENDRACHANDRA ROY",
    "MOTHER": "BOKUL BALA ROY",
    "DOB": "NA",
    "WIFE": "LAXMI ROY (SARKAR)",
    "CHILDREN": ["PAYEL ROY", "AMIT ROY"]
  },
  {
    "NAME": "LAXMI ROY (SARKAR)",
    "SEX": "FEMALE",
    "FATHER": "BIJOY SARKAR",
    "MOTHER": "NA",
    "DOB": "NA",
    "HUSBAND": "RATAN ROY",
    "CHILDREN": ["KANU SARKAR", "SARASWATI SARKAR", "ANJALI SARKAR", "LAXMI ROY (SARKAR)", "BALAI SARKAR", "BABURAM SARKAR"]
  },
  {
    "NAME": "PUTUL MAJUMDER (ROY)",
    "SEX": "FEMALE",
    "FATHER": "NAGENDRACHANDRA ROY",
    "MOTHER": "BOKUL BALA ROY",
    "DOB": "NA",
    "HUSBAND": "SUBHAS MAJUMDER",
    "CHILDREN": ["ARPITA MAJUMDER"]
  },
  {
    "NAME": "PURNIMA ADHIKARY (ROY)",
    "SEX": "FEMALE",
    "FATHER": "NAGENDRACHANDRA ROY",
    "MOTHER": "BOKUL BALA ROY",
    "DOB": "NA",
    "HUSBAND": "HAREKRISHNA ADHIKARY",
    "CHILDREN": ["RANIT ADHIKARY"]
  },
  {
    "NAME": "SANTANU ROY",
    "SEX": "MALE",
    "FATHER": "SRIKRISHNA ROY",
    "MOTHER": "NITAMBINI ROY",
    "DOB": "29/02/1992",
    "WIFE": "NIBEDITA ROY (MALLICK)",
    "CHILDREN": []
  },
  {
    "NAME": "NIBEDITA ROY (MALLICK)",
    "SEX": "FEMALE",
    "FATHER": "ASHIM MALLICK",
    "MOTHER": "SUCHISMITA MALLICK (PODDER)",
    "DOB": "18/10/1992",
    "HUSBAND": "SANTANU ROY",
    "CHILDREN": []
  },
  {
    "NAME": "DIPTANU ROY",
    "SEX": "MALE",
    "FATHER": "SRIKRISHNA ROY",
    "MOTHER": "NITAMBINI ROY",
    "DOB": "30/11/1995",
    "WIFE": "NA",
    "CHILDREN": []
  }
];

const FamilyTreeContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: 20px;
  justify-items: center;
  align-items: center;
  margin: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  color: navajowhite;
  background-color: royalblue;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.2s ease;
  width: fit-content;
  height: fit-content;
  margin: 10px;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
`;

const Name = styled.div`
  margin-top: 10px;
  font-weight: bold;
  text-align: center;
`;

const Popup = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9999;
`;

const PopupContent = styled.div`
  position: relative;
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  color: floralwhite;
  background-color: darkviolet;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const PopupImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
`;

const PopupDetails = styled.div`
  margin-top: 10px;
`;

const CloseButton = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  background-image: url("images/close.png");
  background-size: cover;
  width: 20px;
  height: 20px;
`;

class FamilyTree extends Component {
  hasChildren(member) {
    return member.children && member.children.length;
  }

  render() {
    const { members, level } = this.props;
    return (
      <FamilyTreeContainer style={{ marginTop: `${level * 30}px` }}>
        {members.map((member, i) => (
          <div key={`level-${level}-${i}`}>
            <Container>
              <Image
                src={`images/${member.NAME.replace(/\s+/g, "").toLowerCase()}.png`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = member.SEX === "MALE" ? "images/male_avatar.png" : "images/female_avatar.png";
                }}
              />
              <Name>{member.NAME}</Name>
            </Container>
            {this.hasChildren(member) && (
              <FamilyTree members={member.children} level={level + 1} />
            )}
          </div>
        ))}
      </FamilyTreeContainer>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupVisible: false,
      selectedPerson: null,
    };
  }

  handleImageClick = (person) => {
    this.setState({
      popupVisible: true,
      selectedPerson: person,
    });
  };

  handleCloseClick = () => {
    this.setState({
      popupVisible: false,
      selectedPerson: null,
    });
  };

  render() {
    return (
      <>
        <FamilyTree members={familyData} level={0} onClick={this.handleImageClick} />
        {this.state.popupVisible && this.state.selectedPerson && (
          <Popup>
            <PopupContent>
              <h2>Person Details</h2>
              <PopupImage
                src={`images/${this.state.selectedPerson.NAME.replace(/\s+/g, "").toLowerCase()}.png`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = this.state.selectedPerson.SEX === "MALE" ? "images/male_avatar.png" : "images/female_avatar.png";
                }}
              />
              <PopupDetails>
                <p>Name: {this.state.selectedPerson.NAME}</p>
                <p>Sex: {this.state.selectedPerson.SEX}</p>
                <p>Father: {this.state.selectedPerson.FATHER}</p>
                <p>Mother: {this.state.selectedPerson.MOTHER}</p>
                <p>Date of Birth: {this.state.selectedPerson.DOB}</p>
                {this.state.selectedPerson.SEX === "MALE" ? (
                  <p>Wife: {this.state.selectedPerson.WIFE}</p>
                ) : (
                  <p>Husband: {this.state.selectedPerson.HUSBAND}</p>
                )}
                <p>Children: {this.state.selectedPerson.CHILDREN.join(", ")}</p>
              </PopupDetails>
              <CloseButton src="images/close.png" alt="Close" onClick={this.handleCloseClick} />
            </PopupContent>
          </Popup>
        )}
      </>
    );
  }
}

render(<App />, document.getElementById('root'));
