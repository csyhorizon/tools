import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 10 },  // 처음 10초 동안 사용자 10명까지 서서히 증가
    { duration: '30s', target: 50 },  // 30초 동안 사용자 50명까지 증가 (본격 부하)
    { duration: '10s', target: 0 },   // 10초 동안 사용자 0명으로 감소 (정리)
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
  },
};

export default function () {
  const res = http.get('http://localhost:8080/actuator/health'); 

  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(0.1);
}