import React from 'react';
import { useHistory, useLocation, withRouter } from 'react-router-dom';
import moment from 'moment';
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import 'moment/locale/ko';
import './Route_ReadView.css';

export function Route_ReadView() {
  const location = useLocation();
  const { data } = location.state; // 전달받은 값 데이터에 저장
  const history = useHistory(); // do this inside the component

  const goBack = () => history.push('/route');
  const dateParse = () => {
    // 날짜 파싱하는 함수
    var d = new Date();
    let ndate = moment(d).format('YYYY-MM-DD');
    return ndate;
  };
  const fetchdelete = async () => {
    try {
      //왼쪽 값 설정값 있을 시에만 오른쪽값 조회
      await fetch('http://112.164.190.62:5000/api/route_delete', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          pid: data?.pid,
        }),
      })
        .then(response => response.json())
        .then(res => {
          if (res.success === true) {
            // eslint-disable-next-line no-alert
            alert('노선을 삭제했습니다.');
            history.goBack();
          } else {
            // eslint-disable-next-line no-alert
            alert('노선을 등록하지 못했습니다.');
          }
        })
        .catch(error => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const confirmModal_delete = () => {
    if (window.confirm('노선을 삭제하시겠습니까?')) {
      fetchdelete();
    } else {
      console.log('취소. 변화 없음');
    }
  };

  const confirmModal_edit = () => {
    if (window.confirm('노선을 수정하시겠습니까?')) {
      history.push({
        pathname: '/route_update',
        state: { udata: data },
      });
    } else {
      console.log('취소. 변화 없음');
    }
  };

  return (
    <div className="container">
      <div>test</div>
      <div className="cbox">
        <div className="golist" onClick={goBack}>
          목록
        </div>

        <div className="editbutton" onClick={confirmModal_edit}>
          수정
        </div>

        <div className="deletebutton" onClick={confirmModal_delete}>
          삭제
        </div>
      </div>
    </div>
  );
}

export default withRouter(Route_ReadView);