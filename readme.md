## Some helpful commands to run

```
docker build --target ReactServer -t congenial-eureka/weather-app:v1 .
docker build --target apiServer -t congenial-eureka/weather-backend:v1 .
kubectl apply -f kube/mongodb.yaml
kubectl apply -f kube/frontend.yaml
kubectl apply -f kube/backend.yaml
```

This was done using docker-desktop kubernetes. MongoDB was just used to complete the requirements, but redis would have been a better choice.

# Assignment: Develop a Weather App with a 3-Tier Architecture

**Objective**: Develop a weather application that takes a city as input and displays the weather, utilizing a 3-tier web application architecture. The project should showcase your proficiency in Docker, Kubernetes, and Infrastructure as Code (IaC).

**Requirements:**

**Frontend:**

A user interface for inputting a city and viewing the weather data.

Tech Stack: React

**Backend:**

A RESTful API to fetch weather data based on the city input.

Tech Stack: Node.js

**Database:**

Store any necessary data (if applicable).

Tech Stack: MongoDB (optional)

**Infrastructure:**

* Containerize the application using Docker.
* Deploy the application using Kubernetes, * leveraging any preferred IaC tools.
* Set up a 3-tier architecture with distinct pods for the frontend, backend, and database.
* You may deploy on any platform of your choice (e.g., AWS, GCP, or a local Kubernetes cluster).
* **Nice to Have:** Deploy infrastructure using Terraform.

**Deliverables:**

* A fully functional weather application accessible via a URL.
* A GitHub repository containing: 
  * The complete codebase.
  * Docker and Kubernetes deployment packages (Helm charts or Kubernetes YAML files).
  * Infrastructure deployment configurations (including Terraform scripts if applicable).