# Distributed Cloud System Architecture - Layered Documentation

This document demonstrates progressive architectural abstraction using C4 diagrams, starting from a high-level system context and drilling down into implementation details of a fictional distributed e-commerce platform.

---

## Layer 1: System Context - Highest Abstraction

**Abstraction Level:** Enterprise-wide view showing major system boundaries and external actors; all microservices grouped into logical domains, databases abstracted as data stores.

```mermaid
C4Context
    title Layer 1 - E-Commerce Platform System Context

    Person(customer, "Customer", "End user shopping online")
    Person(admin, "Admin User", "Platform administrator")

    System_Ext(oauth, "OAuth Provider", "Auth0 - Identity & access management")
    System_Ext(payment, "Payment Gateway", "Stripe API")
    System_Ext(email, "Email Service", "SendGrid")

    Enterprise_Boundary(platform, "E-Commerce Platform") {
        System(frontend, "Web Application", "Customer-facing UI with BFF pattern")
        System(backend, "Core Services", "Order, inventory, and payment processing microservices")
        System(analytics, "Analytics Pipeline", "Real-time and batch analytics processing")
        SystemDb(transactional, "Transactional Storage", "PostgreSQL cluster")
        SystemDb(analytical, "Analytics Storage", "BigQuery data warehouse")
        SystemQueue(messaging, "Event Bus", "Kafka cluster with DLQs and circuit breakers")
    }

    Rel(customer, frontend, "Shops via", "HTTPS")
    Rel(admin, frontend, "Manages via", "HTTPS")
    Rel(frontend, oauth, "Authenticates", "OAuth2/OIDC")
    Rel(frontend, backend, "API calls", "HTTPS/gRPC")
    Rel(backend, messaging, "Publishes events", "Kafka Protocol")
    Rel(messaging, analytics, "Consumes events", "Kafka Protocol")
    Rel(backend, transactional, "Reads/Writes", "SQL")
    Rel(backend, payment, "Processes payments", "REST API")
    Rel(analytics, analytical, "Writes aggregates", "BigQuery API")
    Rel(analytics, email, "Sends notifications", "SMTP")

    UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")
```

---

## Layer 2: Container View - Backend Services Separated

**Abstraction Level:** Microservices decomposed from monolithic grouping; frontend shows BFF separation; messaging infrastructure revealed with rate limiting components.

```mermaid
C4Container
    title Layer 2 - Container Architecture with Service Separation

    Person(customer, "Customer", "Online shopper")
    System_Ext(oauth, "Auth0", "OAuth2 provider")
    System_Ext(stripe, "Stripe", "Payment processing")
    System_Ext(sendgrid, "SendGrid", "Email delivery")

    Container_Boundary(frontend, "Frontend Layer") {
        Container(webapp, "Web UI", "React/TypeScript", "SPA for customer interactions")
        Container(bff, "BFF", "Node.js/Express", "Backend-for-frontend API gateway")
    }

    Container_Boundary(services, "Microservices Layer") {
        Container(order, "Order Service", "Java/Spring Boot", "Order lifecycle management")
        Container(inventory, "Inventory Service", "Go", "Stock and SKU management")
        Container(payment, "Payment Service", "Java/Spring Boot", "Payment orchestration")
        Container(user, "User Service", "Node.js", "User profile and preferences")
    }

    Container_Boundary(messaging, "Event Infrastructure") {
        ContainerQueue(kafka, "Kafka Cluster", "Apache Kafka", "Event streaming platform")
        Container(breaker, "Circuit Breaker", "Resilience4j", "Fault tolerance with rate limits")
        ContainerQueue(dlq, "Dead Letter Queue", "Kafka Topic", "Failed message handling")
    }

    Container_Boundary(analytics, "Analytics Pipeline") {
        Container(stream, "Stream Processor", "Kafka Streams", "Real-time event processing")
        Container(batch, "Batch ETL", "Apache Beam", "Hourly aggregation jobs")
    }

    ContainerDb(postgres, "PostgreSQL", "PostgreSQL 15", "Transactional data")
    ContainerDb(bq, "BigQuery", "Google BigQuery", "Analytics data warehouse")

    Rel(customer, webapp, "Uses", "HTTPS")
    Rel(webapp, bff, "API calls", "REST/JSON")
    Rel(bff, oauth, "Validates tokens", "OAuth2")
    Rel(bff, order, "Orders", "gRPC")
    Rel(bff, inventory, "Stock checks", "gRPC")
    Rel(bff, user, "User data", "REST")

    Rel(order, kafka, "OrderCreated event", "Kafka")
    Rel(inventory, kafka, "StockUpdated event", "Kafka")
    Rel(payment, kafka, "PaymentProcessed event", "Kafka")
    Rel(payment, stripe, "Charge", "REST API")

    Rel(kafka, breaker, "Routes through", "")
    Rel(breaker, stream, "Delivers events", "")
    Rel(breaker, dlq, "Failed msgs", "Kafka")

    Rel(stream, bq, "Writes", "BigQuery API")
    Rel(batch, bq, "Bulk load", "BigQuery API")
    Rel(stream, sendgrid, "Notifications", "SMTP")

    Rel(order, postgres, "CRUD", "JDBC")
    Rel(inventory, postgres, "CRUD", "SQL")
    Rel(payment, postgres, "CRUD", "JDBC")
    Rel(user, postgres, "CRUD", "pg driver")

    UpdateLayoutConfig($c4ShapeInRow="4", $c4BoundaryInRow="2")
```

---

## Layer 3: Component View - Order Service Internals

**Abstraction Level:** Deep dive into Order Service architecture showing internal components, circuit breaker integration, command/query separation, and event publishing patterns.

```mermaid
C4Component
    title Layer 3 - Order Service Component Architecture

    Container_Ext(bff, "BFF", "Node.js", "API Gateway")
    ContainerDb_Ext(postgres, "PostgreSQL", "Orders DB", "Persistent storage")
    ContainerQueue_Ext(kafka, "Kafka", "Event Bus", "Event streaming")
    Container_Ext(inventory, "Inventory Service", "Go", "Stock checks")
    Container_Ext(payment, "Payment Service", "Java", "Payment processing")

    Container_Boundary(order, "Order Service") {
        Component(api, "Order API", "Spring MVC Controllers", "REST endpoints for order operations")
        Component(command, "Command Handler", "CQRS Commands", "Handles write operations")
        Component(query, "Query Handler", "CQRS Queries", "Handles read operations")
        Component(saga, "Saga Coordinator", "Spring State Machine", "Distributed transaction orchestration")
        Component(validator, "Order Validator", "Spring Bean", "Business rule validation")
        Component(publisher, "Event Publisher", "Spring Kafka", "Publishes domain events")
        Component(breaker, "Circuit Breaker", "Resilience4j", "Rate: 100/sec, timeout: 3s")
        Component(repo, "Order Repository", "Spring Data JPA", "Data access layer")
        ComponentDb(cache, "Redis Cache", "Redis", "Query result caching")
    }

    Rel(bff, api, "CreateOrder, GetOrder", "REST/JSON")
    Rel(api, command, "Process command", "")
    Rel(api, query, "Execute query", "")

    Rel(command, validator, "Validate", "")
    Rel(command, saga, "Start saga", "")
    Rel(saga, breaker, "External calls", "")
    Rel(breaker, inventory, "Reserve stock", "gRPC")
    Rel(breaker, payment, "Authorize payment", "gRPC")

    Rel(saga, repo, "Save order", "")
    Rel(saga, publisher, "Publish events", "")
    Rel(publisher, kafka, "OrderCreated, OrderConfirmed", "Kafka Protocol")

    Rel(query, cache, "Check cache", "Redis Protocol")
    Rel(query, repo, "Fetch from DB", "")
    Rel(repo, postgres, "SQL queries", "JDBC")

    UpdateRelStyle(bff, api, $offsetY="-30")
    UpdateRelStyle(api, command, $offsetX="-50")
    UpdateRelStyle(api, query, $offsetX="50")
    UpdateRelStyle(saga, breaker, $offsetY="-20")
    UpdateRelStyle(publisher, kafka, $offsetY="-30")
```

---

## Layer 4: Event Flow Detail - Circuit Breaker & DLQ Pattern

**Abstraction Level:** Zoom into the event messaging infrastructure showing circuit breaker states, retry logic, rate limiting (100 events/sec), DLQ routing, and monitoring hooks.

```mermaid
C4Component
    title Layer 4 - Event Infrastructure with Fault Tolerance

    Component_Ext(orderSvc, "Order Service", "Java", "Event publisher")
    Component_Ext(inventorySvc, "Inventory Service", "Go", "Event publisher")
    Component_Ext(analytics, "Stream Processor", "Kafka Streams", "Event consumer")
    ComponentDb_Ext(monitoring, "Prometheus", "Metrics", "Observability")

    Container_Boundary(eventBus, "Event Infrastructure") {
        Component(producer, "Producer API", "Kafka Producer", "Message ingestion")
        Component(limiter, "Rate Limiter", "Token Bucket", "100 events/sec per partition")
        Component(breaker, "Circuit Breaker", "Hystrix Pattern", "Open after 50% failure in 10s window")
        ComponentQueue(mainTopic, "Main Topics", "Kafka Topics", "orders, inventory, payments")
        Component(consumer, "Consumer Group", "Kafka Consumer", "Guaranteed delivery")
        Component(retryHandler, "Retry Handler", "Spring Retry", "Exponential backoff: 1s, 2s, 4s")
        ComponentQueue(dlq, "DLQ Topic", "Kafka DLQ", "Failed messages after 3 retries")
        Component(alerter, "Alerting", "PagerDuty Hook", "DLQ threshold alerts")
        ComponentDb(offset, "Offset Storage", "Kafka Internal", "Consumer position tracking")
    }

    Rel(orderSvc, producer, "Publish event", "Async")
    Rel(inventorySvc, producer, "Publish event", "Async")
    Rel(producer, limiter, "Check rate", "")
    Rel(limiter, breaker, "Within limit", "")
    Rel(breaker, mainTopic, "Route to topic", "")

    Rel(mainTopic, consumer, "Poll events", "")
    Rel(consumer, analytics, "Deliver event", "")
    Rel(consumer, offset, "Commit offset", "")
    Rel(consumer, retryHandler, "On failure", "")

    Rel(retryHandler, mainTopic, "Retry 1-3", "")
    Rel(retryHandler, dlq, "After 3 failures", "")
    Rel(dlq, alerter, "Trigger alert", "Webhook")
    Rel(dlq, monitoring, "DLQ depth metric", "")

    Rel(breaker, monitoring, "Circuit state metrics", "")
    Rel(limiter, monitoring, "Rate metrics", "")
    Rel(limiter, producer, "Rate exceeded", "429 response")

    UpdateRelStyle(producer, limiter, $offsetX="-40")
    UpdateRelStyle(limiter, breaker, $offsetX="-40")
    UpdateRelStyle(consumer, analytics, $offsetY="-40")
    UpdateRelStyle(retryHandler, dlq, $offsetX="60")
```

---

## Layer 5: Authentication Flow - OAuth Integration Detail

**Abstraction Level:** Maximum detail on the OAuth2/OIDC authentication flow through the BFF, showing token validation, refresh logic, session management, and security boundaries.

```mermaid
C4Dynamic
    title Layer 5 - OAuth2 Authentication Flow (Authorization Code + PKCE)

    Person(user, "Customer", "End user")
    Container(webapp, "Web UI", "React SPA", "Customer interface")
    Container(bff, "BFF", "Node.js/Express", "Backend for frontend")
    System_Ext(auth0, "Auth0", "OAuth Provider")
    Container(orderApi, "Order Service", "Java", "Protected resource")
    ContainerDb(sessionStore, "Redis", "Session Store", "Refresh tokens (encrypted)")

    RelIndex(1, user, webapp, "1. Click Login")
    RelIndex(2, webapp, bff, "2. GET /auth/login")
    RelIndex(3, bff, auth0, "3. Redirect to /authorize?client_id=...&code_challenge=...")
    RelIndex(4, auth0, user, "4. Login prompt")
    RelIndex(5, user, auth0, "5. Credentials + MFA")
    RelIndex(6, auth0, bff, "6. Redirect with auth code")
    RelIndex(7, bff, auth0, "7. POST /oauth/token (code + code_verifier)")
    RelIndex(8, auth0, bff, "8. Return access_token + refresh_token + id_token")
    RelIndex(9, bff, sessionStore, "9. Store refresh_token (30 day TTL)")
    RelIndex(10, bff, webapp, "10. Set httpOnly cookie with session_id")
    RelIndex(11, webapp, bff, "11. API request with session cookie")
    RelIndex(12, bff, bff, "12. Validate session + check access_token expiry")
    RelIndex(13, bff, orderApi, "13. Forward request + Bearer token")
    RelIndex(14, orderApi, auth0, "14. Validate token signature (JWKS)")
    RelIndex(15, orderApi, bff, "15. Return protected data")
    RelIndex(16, bff, webapp, "16. Return response")

    UpdateRelStyle(user, webapp, $offsetY="-40")
    UpdateRelStyle(webapp, bff, $offsetX="-60")
    UpdateRelStyle(bff, auth0, $offsetY="-30")
    UpdateRelStyle(auth0, user, $offsetX="80", $offsetY="20")
    UpdateRelStyle(bff, sessionStore, $offsetX="-80")
    UpdateRelStyle(bff, orderApi, $offsetY="-30")
    UpdateRelStyle(orderApi, auth0, $offsetX="60", $offsetY="-20")
```

---

## Summary

This layered documentation demonstrates:

1. **Layer 1** - System context: All complexity abstracted into 6 major components
2. **Layer 2** - Container view: 15+ containers showing service boundaries and infrastructure
3. **Layer 3** - Component view: Internal architecture of Order Service with CQRS and circuit breakers
4. **Layer 4** - Event infrastructure: Detailed fault tolerance with specific rate limits (100/sec) and retry policies
5. **Layer 5** - Authentication flow: Step-by-step OAuth2 sequence with PKCE security

Each layer removes abstraction to reveal implementation details critical for understanding the distributed system's resilience, scalability, and security patterns.

---

*This document was generated with GitHub Copilot*
