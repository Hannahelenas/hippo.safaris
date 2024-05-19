import styled from 'styled-components';

const FooterWrapper = styled.div`
background-color: #F9F9EF;
height: 40vh;
width: 100%;
display: flex;
justify-content: center;
align-items: center;
z-index: -1;
`

const FooterSection = () => {
  return (
    <FooterWrapper>Footer</FooterWrapper>
  )
}

export default FooterSection
