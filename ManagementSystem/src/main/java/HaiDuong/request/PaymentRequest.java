package HaiDuong.request;

import lombok.Data;

@Data
public class PaymentRequest {
    private String status;
    private String message;

    private String URL;
}
