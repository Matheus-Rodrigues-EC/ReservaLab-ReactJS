import styled from "styled-components";
import Background from '../../assets/Background.png';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  ::-webkit-scrollbar{
    display: none;
  }
  background-image: url(${Background});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
`

export {
  Container
}