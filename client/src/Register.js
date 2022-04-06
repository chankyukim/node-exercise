import React, { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9_]{3,23}$/;
// 먼저 USER_REGEX를 해석해보자면
// 첫글자는 소문자, 대문자 알파벳이어야하며
// 나머지 글자는 소문자, 대문자, 숫자, 밑줄이 가능하고 3~23자이다. 따라서 총 4~24글자.

//[a-zA-Z0-9]  a~z, A~Z 0~9 사이의 모든 문자
//^는 텍스트의 시작, 달러 기호 $는 텍스트의 끝
//{3,23} 3개 이상 5개 이하
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// PWD_REGEX를 해석해보면
//소문자, 대문자, 숫자, 특수문자 !@#$%가 꼭 들어있고 8~24글자.
// 라는 뜻이다.

const REGISTER_URL = '/register';

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd]);

  const handleSubmit = async e => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg('Invalid Entry');
      return;
    }
    try {
      const response = await axios.post(REGISTER_URL, JSON.stringify({ user, pwd }), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      console.log(response.data);
      console.log(response.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      //clear input fields
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('username taken');
      } else {
        setErrMsg('registration failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </section>
      ) : (
        <section>
          <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
            {errMsg}
          </p>
          <h1>회원가입</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              아이디:
              <span className={validName ? 'valid' : 'hide'}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              {/* 유효성 검사에 맞다면 없애주고, input이 비어있다면 "hide"해주기 */}
              <span className={validName || !user ? 'hide' : 'invalid'}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={e => setUser(e.target.value)}
              required
              aria-invalid={validName ? 'false' : 'true'}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            {/* username input에 focus되어있고, input에 글자가 적혀져있지만, 유효성검사에 어긋날때는 "instructions" */}
            <p
              id="uidnote"
              className={userFocus && user && !validName ? 'instructions' : 'offscreen'}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              글자수를 4~24로 맞춰주세요.
              <br />
              영어 알파벳으로 시작해야합니다.
              <br />
              가능한 문자 : 알파벳, 숫자, _ , -
            </p>

            <label htmlFor="password">
              비밀번호:
              <span className={validPwd ? 'valid' : 'hide'}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPwd || !pwd ? 'hide' : 'invalid'}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="password"
              onChange={e => setPwd(e.target.value)}
              required
              aria-invalid={validPwd ? 'false' : 'true'}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p id="pwdnote" className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}>
              <FontAwesomeIcon icon={faInfoCircle} />
              글자수를 8~24로 맞춰주세요.
              <br />
              영어 대문자, 소문자, 숫자, 특수문자를 반드시 포함시켜야 합니다.
              <br />
              가능한 특수문자 :<span aria-label="exclamation mark">!</span>
              <span aria-label="at symbol">@</span>
              <span aria-label="hashtag">#</span>
              <span aria-label="dollor sign">$</span>
              <span aria-label="percent">%</span>
            </p>

            <label htmlFor="confirm_pwd">
              비밀번호 확인
              <span className={validMatch && matchPwd ? 'valid' : 'hide'}>
                <FontAwesomeIcon icon={faCheck} color="green" />
              </span>
              <span className={validMatch || !matchPwd ? 'hide' : 'invalid'}>
                <FontAwesomeIcon icon={faTimes} color="red" />
              </span>
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={e => {
                setMatchPwd(e.target.value);
              }}
              required
              onFocus={() => {
                setMatchFocus(true);
              }}
              onBlur={() => {
                setMatchFocus(false);
              }}
            />
            <p
              id="confirmnote"
              className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              비밀번호와 일치해야합니다.
            </p>

            <button disabled={!validName || !validPwd || !validMatch ? true : false}>
              Sign Up
            </button>
          </form>
          <p>
            Already registered?
            <br />
            <span className="line">
              {/*put router link here */}
              <a href="/">Sign In</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;

// aria-live 속성은 실시간으로 내용을 갱신하는 영역을 의미
// assertive값은 중요도가 높은 내용에 사용하여 현재 진행중인 보조기기 작업을 중단하고 갱신 내용을 즉시 사용자에게 전달

//https://mwangmoong.tistory.com/17?category=966559
