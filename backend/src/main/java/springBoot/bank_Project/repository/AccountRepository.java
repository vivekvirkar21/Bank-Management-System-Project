package springBoot.bank_Project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import springBoot.bank_Project.model.Account;


@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
	
	public Account findByAccNo(long accNo);
	
}
