package HaiDuong.repository;

import HaiDuong.Model.Subscription;
import HaiDuong.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscriptionRepository extends JpaRepository<Subscription,Long> {
    Subscription findByUserId(Long userId);

}
