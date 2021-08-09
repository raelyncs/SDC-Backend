# Catwalk System Design

### About

Our team of 3 engineers was provided front-end react based legacy code that interacted with an existing API. We were tasked with replacing the existing API with a back end system that could support a data set with over 1 million records and scale to meet the demands of production traffic. Catwalk System Design consists of a RESTful API server that connects to a postgreSQL database and produces read query responses in less than 50ms. I created a schema and seeded a postgreSQL database with CSV files containing a large user data set. Queries were optimized using indexing on most queried keys, which reduced query latency significantly. 

I deployed my API to a single AWS EC2 instance to test and benchmark the initial performance. Loader.io was used to stress test my service by scaling the number of requests per second from 1, 100, 500, to 1k. I then horizontally scaled using Nginx round-robin load balancing on 2 AWS EC2 instances to to reach 1000 requests per second with error rates less than 1% and latency of less than 2000ms.

### Technologies
* PosteSQL
* Node.js
* Express.js
* Loader.io
* Nginx
* AWS
