import styled from 'styled-components'
import emptyRoom from './empty-room-with-windows.jpg'
import { BASE_LENGTH } from './room-image-param'



const ImageContainerDiv = styled.div`
position:relative;
z-index:1;
width:${`${BASE_LENGTH}px`};
height:${`${BASE_LENGTH / 2.22}px`};
background-image:url(${emptyRoom});
background-position:center;
background-size:contain;
& > a{
    display:inline-block;
    position:absolute;
    bottom:10px;
    right:10px;
    color:grey;
    font-size:10px;
    &:link{
        color:grey;
    }
}
`

export const RoomImageArea = ({ children }: { children: React.ReactNode }) => {
    return (
        <ImageContainerDiv>
            {children}
            <a href='https://jp.freepik.com/photos/background' target="_blank" rel="noreferrer noopener">
                Kjpargeter - jp.freepik.com によって作成された background 写真
            </a>
        </ImageContainerDiv>
    )
}