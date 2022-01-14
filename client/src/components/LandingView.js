import React from "react";
import { Container } from "reactstrap";
import { Arrow } from "./Arrow";

export const LandingView = () => {
  return (
    <div
      className="page-header section-dark"
      style={{
        backgroundImage:
          "url(" +
          require("../assets/img/tyler-nix-Pw5uvsFcGF4-unsplash.jpg") +
          ")",
      }}
    >
      <div className="content-center">
        <Container>
          <div className="title-brand">
            <h1 className="presentation-title" style={{ fontSize: "7em" }}>
              Let's get married.
            </h1>
          </div>
          <h2 className="presentation-subtitle text-center">
            Seal your union on the blockchain, officiated by $PEOPLE.
          </h2>
          <span className="bottomright">a voluntary <a href="https://people-dao.com" target="_blank" rel="noopener noreferrer">PeopleDAO</a> project</span>
        </Container>
        <Arrow />
      </div>
    </div>
  );
};
