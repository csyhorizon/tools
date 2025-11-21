import http from 'k6/http';
import { check } from 'k6';

export const options = {
  scenarios: {
    kill_the_server: { 
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 100 }, 
        { duration: '2m', target: 300 },  
      ],
      gracefulRampDown: '0s',
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.05'], 
  },
};

export default function () {
  const res = http.get('http://localhost:8080/actuator/health'); 
  
  check(res, { 'status is 200': (r) => r.status === 200 });
}