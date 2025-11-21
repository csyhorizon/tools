import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    login_storm: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 10 }, 
        { duration: '1m', target: 100 },
        { duration: '30s', target: 100 },
      ],
      gracefulRampDown: '0s',
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<2000'], 
  },
};

export default function () {
  const url = 'http://localhost:8080/api/auth/login';
  
  const randomEmail = `test_user_${__VU}_${__ITER}@example.com`;
  
  const payload = JSON.stringify({
    email: randomEmail,
    password: 'someRandomPassword123!',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);
  
  check(res, {
    'server handled request': (r) => r.status === 401 || r.status === 200 || r.status === 400,
  });

  sleep(1); 
}