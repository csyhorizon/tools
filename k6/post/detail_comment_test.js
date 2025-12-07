import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 50,
  duration: '30s',
};

export default function () {
  const res = http.get('http://localhost:8080/api/posts/1/comments?page=0&size=50');

  check(res, {
    'status is 200': (r) => r.status === 200,
    'time < 100ms': (r) => r.timings.duration < 100,
  });
  
  sleep(1);
}