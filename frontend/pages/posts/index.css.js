import styled from "styled-components";
export default styled.div`
  max-width: 800px;
  margin: 0 auto;

  header {
    margin: 25px 0;
    padding: 0;
  }

  header h1 {
    font-size: 28px;
    font-weight: bold;
  }

  header h5 {
    color: #888888;
  }

  div img {
    max-width: 100%;
    display: block;
    margin: 0px 0px 25px;
  }

  div p {
    font-size: 18px;
    line-height: 28px;
  }

  @media screen and (min-width: 768px) {
    header {
      margin: 50px 0 50px;
      padding: 0;
    }

    div img {
      max-width: 100%;
      display: block;
      margin: 0px 0px 50px;
    }
  }
`;
