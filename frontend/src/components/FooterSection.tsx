import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const FooterWrapper = styled.div`
background-color: #F9F6F3 /* #efebe8 */;
height: 40vh;
width: 100%;
display: flex;
flex-direction: column; 
justify-content: center;
align-items: center;
z-index: -1;
`

const LinkList = styled.ul`
display: flex;
justify-content: space-between;
align-items: space-between; `

const ListItem = styled.li`
    margin: 0 1rem;
`;

const CopyrightText = styled.p`
  margin-top: 2rem;
  font-size: 14px;
  color: #595959;
`;

const FooterSection = () => {
  return (
    <FooterWrapper><LinkList><ListItem>DESTINATIONS</ListItem>
    <ListItem>INFORMATION</ListItem>
    <ListItem><NavLink to="/contact" className="footer-link">CONTACT</NavLink></ListItem></LinkList>
    <CopyrightText>
        &copy; {new Date().getFullYear()} Hippo Safaris. All rights reserved.
      </CopyrightText></FooterWrapper>
  )
}

export default FooterSection
