//controller

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/requests")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend access
public class RequestController {

    private final RequestRepository requestRepository;

    public RequestController(RequestRepository requestRepository) {
        this.requestRepository = requestRepository;
    }

    @PostMapping
    public Request createRequest(@RequestBody Request request) {
        return requestRepository.save(request);
    }

    @GetMapping
    public List<Request> getAllRequests() {
        return requestRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Request> getRequestById(@PathVariable Long id) {
        return requestRepository.findById(id);
    }

    @PutMapping("/{id}")
    public Request updateRequest(@PathVariable Long id, @RequestBody Request updatedRequest) {
        return requestRepository.findById(id).map(request -> {
            request.setStatus(updatedRequest.getStatus());
            return requestRepository.save(request);
        }).orElseThrow(() -> new RuntimeException("Request not found"));
    }
}
//jpa:

public interface RequestRepository extends JpaRepository<Request, Long> {
}

//model:
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId;
    private String details;
    private String requestType;
    private String content;
    private String status = "Pending"; // Default status
}

