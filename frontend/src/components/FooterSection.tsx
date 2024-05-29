import styled from 'styled-components';

const FooterWrapper = styled.div`
background-color: #F9F6F3 /* #efebe8 */;
height: 40vh;
width: 100%;
display: flex;
justify-content: center;
align-items: center;
z-index: -1;
`

const FooterSection = () => {
  return (
    <FooterWrapper><ul><li>DESTINATIONS</li><li>INFORMATION</li></ul></FooterWrapper>
  )
}

export default FooterSection
