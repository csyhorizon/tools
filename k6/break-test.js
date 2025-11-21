import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    stress_test: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '3m', target: 1000 }, 
      ],
      gracefulRampDown: '0s',
    },
  },
  thresholds: {
    http_req_failed: ['rate<1.00'], 
  },
};

export default function () {
  const res = http.get('http://localhost:8080/actuator/health', {
    timeout: '10s' 
  }); 
  
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(0.01); 
}