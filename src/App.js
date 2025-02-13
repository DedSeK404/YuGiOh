import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState, useRef, useEffect } from "react";
import { Modal, Table, Card } from "react-bootstrap";

const App = () => {
  const generateCards = (startId, count, category) =>
    Array.from({ length: count }, (_, index) => ({
      id: startId + index,
      name: `${category.charAt(0).toUpperCase() + category.slice(1)} Card ${
        index + 1
      }`,
      category: category,
      image: `/images/${category}/${index + 1}.png`,
    }));

  // Generate cards for each category
  const goldCards = generateCards(1, 35, "gold");
  const silverCards = generateCards(36, 82, "silver");
  const otherCards = generateCards(118, 56, "other");

  const cards = [...goldCards, ...silverCards, ...otherCards];

  // Group cards by category
  const groupedCards = cards.reduce((acc, card) => {
    if (!acc[card.category]) acc[card.category] = [];
    acc[card.category].push(card);
    return acc;
  }, {});

  const [show, setShow] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  const categoryRefs = useRef({});

  useEffect(() => {
    Object.entries(categoryRefs.current).forEach(([category, ref]) => {
      if (ref) {
        ref.style.maxHeight = expandedCategories[category]
          ? `${ref.scrollHeight}px`
          : "200px";
      }
    });
  }, [expandedCategories]);

  const handleClose = () => setShow(false);
  const handleShow = (card) => {
    setSelectedCard(card);
    setShow(true);
  };

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div
      className="Container"
      style={{
        backgroundImage: 'url("/bkgs/Background.svg")',
        backgroundRepeat: "repeat",
        backgroundSize: "500px",
      }}
    >
      <div className="container ">
        <img
          style={{ width: "50vw", display: "block", margin: "0 auto" }}
          src="/images/Logo.png"
          alt="0"
        />
        <div style={{ paddingTop: "50px", textAlign: "right" }}>
          <Table variant="dark" striped bordered hover>
            <thead>
              <tr>
                <th>اخرى</th>
                <th>الفضية</th>
                <th>الذهبية</th>
                <th>#</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>56</td>
                <td>82</td>
                <td>35</td>
                <td>عدد البطاقات</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <img
          style={{
            width: "10%",
            position: "fixed",
            bottom: "0",
            left: "0",
            zIndex: "3",
          }}
          src="/images/yugi.png"
          alt="0"
        />

        {Object.entries(groupedCards).map(([category, cards]) => {
          const isExpanded = expandedCategories[category] || false;
          const displayedCards = isExpanded ? cards : cards.slice(0, 6); // Show only first 5 initially

          return (
            <div
              key={category}
              className={`category-section-${
                { gold: "gold", silver: "silver" }[category] || "other"
              }`}
            >
              <div className={`category-header ${category}-header`}>
                <img
                  src={`/images/${
                    { gold: "goldBkg", silver: "silverBkg" }[category] ||
                    "otherBkg"
                  }.png`}
                  width="60px"
                  style={{ margin: "10px" }}
                  alt="0"
                />
                <img
                  src={`/images/${
                    { gold: "goldbutton", silver: "silverbutton" }[category] ||
                    "otherbutton"
                  }.png`}
                  alt="0"
                  width="500px"
                />
                <img
                  src={`/images/${
                    { gold: "goldBkg", silver: "silverBkg" }[category] ||
                    "otherBkg"
                  }.png`}
                  width="60px"
                  style={{ margin: "10px" }}
                  alt="0"
                />
              </div>
              <div
                className={`card-container ${isExpanded ? "expanded" : ""}`}
                ref={(el) => (categoryRefs.current[category] = el)}
              >
                {displayedCards.map((card) => (
                  <div key={card.id} className="card-column">
                    <div
                      className="card-wrapper"
                      onClick={() => handleShow(card)}
                    >
                      <div className="card-flipper">
                        <div className="card-front">
                          <img
                            src={card.image}
                            alt={card.name}
                            className="card-image"
                          />
                        </div>
                        <div className="card-back">
                          <img
                            src="/images/card-back.png"
                            alt="Card Back"
                            className="card-back-image img-fluid"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="category-bottom">
                <button
                  style={{ backgroundImage: 'url("/images/btnbkg.png")' }}
                  className="show-more-btn"
                  onClick={() => toggleCategory(category)}
                >
                  <img
                    src="/images/beetle.png"
                    width={"60px"}
                    style={{ paddingRight: "10px" }}
                    alt="0"
                  />
                  {isExpanded ? "  عرض القليل" : "عرض المزيد"}
                  <img
                    src="/images/beetle.png"
                    width={"60px"}
                    style={{ paddingLeft: "10px" }}
                    alt="0"
                  />
                </button>
              </div>
            </div>
          );
        })}
        <div style={{ padding: "50px 0" }}>
          <Card bg="dark" className="text-end">
            <Card.Header
              style={{
                fontFamily: "Verdana",
                fontWeight: "800",
                fontSize: "2rem",
                color: "white",
              }}
            >
              تنويه
            </Card.Header>
            <Card.Body>
              <Card.Title></Card.Title>
              <Card.Text
                style={{
                  fontFamily: "Verdana",
                  fontWeight: "400",
                  fontSize: "1.5rem",
                  color: "white",
                }}
              >
                HP DeskJet 2320 الجانب الأمامي للبطاقات حقيقي وتم مسحه ضوئيًا
                باستخدام ماسح
              </Card.Text>
              <Card.Text
                style={{
                  fontFamily: "Verdana",
                  fontWeight: "400",
                  fontSize: "1.5rem",
                  color: "white",
                }}
              >
                ومع ذلك، فإن الجانب الخلفي للبطاقات لا يمثل الجزء الخلفي
                الحقيقي، فقد تمت إضافته لأغراض زخرفية فقط
              </Card.Text>
              <hr style={{ color: "gray" }} />
              <Card.Text
                style={{
                  fontFamily: "Verdana",
                  fontWeight: "400",
                  fontSize: "1.5rem",
                  color: "white",
                }}
              >
                للتواصل معنا
              </Card.Text>
              <Table variant="dark" striped bordered hover>
                <tbody>
                  <tr>
                    <td>
                      {" "}
                      <a href="https://facebook.com/DedSekMWN/" target="_blank">
                        facebook.com/DedSekMWN/
                      </a>{" "}
                      : فايسبوك{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>الهاتف: 799 538 28 </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
        {/* Single Modal Component */}
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Body>
            {selectedCard && (
              <img
                src={selectedCard.image}
                alt={selectedCard.name}
                className="img-fluid"
              />
            )}
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default App;
