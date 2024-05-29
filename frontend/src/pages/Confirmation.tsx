import styled from 'styled-components';
const Confirmation = () => (
    <Background>
        <ContentWrapper>
        <h2>Thankyou for your purchase!</h2>
        <p>Your order has been placed and we can't wait to see you! Please check your email for details about your upcoming safari journey. </p>
        </ContentWrapper>
    </Background>
);

export default Confirmation;

const Background = styled.div`
margin-top: 0;
height: 100vh;
width: 100vw;
position: relative;
background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0.1),
        rgba(0, 0, 0, 0)
    ),
    url('giraffs.jpg');
background-size: cover;
background-position: center;
z-index: 0;
overflow-x: hidden !important;
box-sizing: border-box !important;
display: flex;
justify-content: center;
@media (max-width: 768px) {
    height: auto;
}`

const ContentWrapper = styled.div`
margin-top: 25vh;
display: flex;
flex-direction: column;
height: 20vh;
padding: 2rem;
justify-content: center;
align-items: center;
background-color: rgba(255, 255, 255, 0.9);
`
