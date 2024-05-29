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

const LinkList = styled.ul`
display: flex;
justify-content: space-between;
align-items: space-between; `

const ListItem = styled.li`
    margin: 0 1rem;
`;

const FooterSection = () => {
  return (
    <FooterWrapper><LinkList><ListItem>DESTINATIONS</ListItem>
    <ListItem>INFORMATION</ListItem>
    <ListItem>CONTACT</ListItem></LinkList></FooterWrapper>
  )
}

export default FooterSection
