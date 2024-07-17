package HaiDuong.service;

import HaiDuong.Model.PlanType;
import HaiDuong.Model.Subscription;
import HaiDuong.Model.User;

public interface SubscriptionService {
    Subscription createSubscription(User user);
    Subscription getUserSubscription(Long userId) throws Exception;

    Subscription upgradeSubscription(Long userId, PlanType planType) throws Exception;

    boolean isValid(Subscription subscription);
}
