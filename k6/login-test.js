import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    login_storm: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '10s', target: 20 },
        { duration: '30s', target: 100 },
        { duration: '10s', target: 0 },
      ],
      gracefulRampDown: '5s',
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<2000'],
    http_req_failed: ['rate<0.01'], 
  },
};

export default function () {
  const url = 'http://localhost:8080/api/auth/login';
  
  const payload = JSON.stringify({
    email: 'test@naver.com',
    password: 'test1234',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);
  
  check(res, {
    'is status 200 or 401': (r) => r.status === 200 || r.status === 401,
    'is not server error': (r) => r.status < 500, 
  });

  sleep(1); 
}