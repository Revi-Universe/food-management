import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface LoginFormType {
  id: string;
  pw: string;
}
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<LoginFormType>();

  const IdPwRegex = /^[a-zA-Z0-9]+$/;

  const onVaild: SubmitHandler<LoginFormType> = userdata => {
    const navigate = useNavigate();

    //로그인 폼 전달
    axios
      .post('http://localhost:5000/testRegster123', { userdata })
      .then(response => {
        if (
          response.data.isCorrectId === true &&
          response.data.isCorrectPw === true
        ) {
          {
            navigate('/Main');
          }
        } else if (response.data.isCorrectId === false) {
          //비정상적인 접근으로 가입했을 때 메시지를 읽음, 메세지 종류에 따라서 유저에게 보여주는것이 다르다
          //if(response.data.message==='') {
          // return alert('')
          //}
          return alert(response.data.message);
        }
      })
      .catch(error => {
        alert(`${error} '원인을 알 수 없는 오류가 발생했습니다.'`);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onVaild)}>
        <h2 className="text-2xl py-3 leading-10 font-medium">로그인</h2>
        <input
          {...register('id', {
            required: '아이디를 입력해 주세요',
            minLength: {
              value: 4,
              message: '4자 이상 입력해 주세요',
            },
            maxLength: {
              value: 15,
              message: '15자 이하 입력해 주세요',
            },
            pattern: {
              value: IdPwRegex,
              message: '아이디는 알파벳과 숫자로만 입력할 수 있습니다',
            },
          })}
          placeholder="아이디"
          className="input input-bordered w-full"
        />

        <label className="label">
          <span className="label-text-alt text-red-600">
            {errors.id && errors.id.message && errors.id.message}
          </span>
        </label>

        <input
          type="password"
          {...register('pw', {
            required: '비밀번호를 입력해 주세요',
            minLength: {
              value: 4,
              message: '4자 이상 입력해 주세요',
            },
            maxLength: {
              value: 15,
              message: '15자 이하 입력해 주세요',
            },
            pattern: {
              value: IdPwRegex,
              message: '비밀번호는 알파벳과 숫자로만 입력할 수 있습니다',
            },
          })}
          placeholder="비밀번호"
          className="input input-bordered w-full"
        />

        <label className="label">
          <span className="label-text-alt text-red-600">
            {errors.pw && errors.pw.message && errors.pw.message}
          </span>
        </label>

        <button className="btn btn-block mt-4" type="submit">
          로그인
        </button>
      </form>
    </>
  );
};

export default Login;
