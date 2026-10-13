package springBoot.bank_Project.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import springBoot.bank_Project.model.Account;
import springBoot.bank_Project.repository.AccountRepository;

@Service
public class AccountService {
	
	@Autowired
	private AccountRepository repo;

	public List<Account> getAllAccount() {
		return repo.findAll();
	}

	
	public Account getByAccNo(long accNo) {
		return repo.findByAccNo(accNo);
	}

	
	public Account addAccount(Account account) {
		return repo.save(account);
	}

	
	public Account updateAccount(long accNo, Account account) {
		Account existing = repo.findByAccNo(accNo);
		if(existing == null) {
			return null;
		}
		existing.setName(account.getName());
		existing.setPin(account.getPin());
		return repo.save(existing);
	}

	
	public String deleteAccount(long accNo,int pin) {
		Account account = null;
		account = repo.findByAccNo(accNo);
		if(account != null) {
			if(account.getPin() == pin) {
				repo.deleteById(accNo);
				return "account delete success...";
			}else {
				return "enter valid pin...";
			}
		}else {
			return null;
		}
	}

	
	public String deposit(long accNo, double amount) throws Exception {
		Account account = repo.findByAccNo(accNo);
		if(account == null) {
			return "Incorrect account no..";
		}
		if(amount > 0) {
			double balance = account.getBalance()+amount;
			account.setBalance(balance);
			repo.save(account);
			return "ok";
		}else {
			return "enter valid amount...";
		}
	}

	
	public String withdraw(long accNo, double amount) throws IOException{
		Account account = repo.findByAccNo(accNo);
		if(account == null) {
			return "Incorrect account no..";
		}
		double balance = account.getBalance();
		if(amount > 0 && amount < balance) {
			if((balance-amount) > 500) {
				account.setBalance(balance-amount);
				repo.save(account);
				return "ok";
			}else {
				return "mentain sufficient balance..";
			}
		}else {
			return "enter valid amount..";
		}
	}

	
}
