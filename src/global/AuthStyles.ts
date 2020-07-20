import styled from 'styled-components';
import {Link} from 'react-router-dom'


export const Container = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const FormContainer = styled.div`
    background: #FFF;
    padding: 40px;
    border-radius: 10px;
    width: 450px;
    max-width: 90%;
`;

export const Input = styled.input`
    background: none;
    border-width: 0 0 2px 0;
    border-color: #9899B0;
    border-style: solid;
    padding: 4px 4px 2px 4px;
    width: 100%;
    height: 40px;
    font-size: 16px;

    :focus {
        outline: none;
    }
`;

export const ForgotPasswordLink = styled(Link)`
    color: #9899B0;
    margin-top: 5px;
    margin-bottom: 5px;
    display: block;

    :hover {
        color: #6F6F6F;
    }
`;
