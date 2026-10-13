package springBoot.bank_Project.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import springBoot.bank_Project.DTO.BalanceDTO;
import springBoot.bank_Project.DTO.PinDTO;
import springBoot.bank_Project.model.Account;
import springBoot.bank_Project.service.AccountService;

@RestController
@CrossOrigin
public class AccountController {
	
	@Autowired
	private AccountService service;
	
	@GetMapping("/accounts")
	public ResponseEntity<List<Account>> getAll(){
		return new ResponseEntity<>(service.getAllAccount(),HttpStatus.OK);
	}
	
	
	@GetMapping("/accounts/{accNo}")
	public ResponseEntity<Account> getByAccNo(@PathVariable long accNo){
		Account account = service.getByAccNo(accNo);
		
		if(account != null) {
			return new ResponseEntity<>(account,HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	
	@PostMapping("/account")
	public ResponseEntity<?> addAccount(@RequestBody Account account){
		try {
			Account acc = service.addAccount(account);
			return new ResponseEntity<>(acc,HttpStatus.CREATED);
		}catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.SERVICE_UNAVAILABLE);
		}
	}
	
	
	@PutMapping("/account/{accNo}")
	public ResponseEntity<String> updateAccount(@PathVariable long accNo, @RequestBody Account account){
		Account acc=null;
		try {
			acc = service.updateAccount(accNo, account);
		}catch(Exception e) {
			return new ResponseEntity<>("Failed to Update.", HttpStatus.BAD_REQUEST);
		}
		if(acc != null) {
			return new ResponseEntity<>("Update Success..",HttpStatus.OK);
		}else {
			return new ResponseEntity<>("account not found..",HttpStatus.NOT_FOUND);
		}
	}
	
	
//	@DeleteMapping("/account/{accNo}")
//	public ResponseEntity<String> deleteAccount(@PathVariable long accNo) {
//		Account account = service.getByAccNo(accNo);
//		if(account != null) {
//			service.deleteAccount(accNo);
//			return new ResponseEntity<>("Deleted...",HttpStatus.OK);
//		}else {
//			return new ResponseEntity<>("Account not Found...",HttpStatus.NOT_FOUND);
//		}
//	}
	
	
	@PutMapping("/account/{accNo}/deposit")
	public ResponseEntity<String> deposit(@PathVariable long accNo, @RequestBody BalanceDTO balance){
		String acc=null;
		double amount = balance.getBalance();
		try {
			acc = service.deposit(accNo,amount);
		}catch(Exception e) {
			return new ResponseEntity<>("failed to deposit..",HttpStatus.INTERNAL_SERVER_ERROR);
		}
		if("ok".equals(acc)) {
			return new ResponseEntity<>("deposit success.",HttpStatus.OK);
		}else {
			return new ResponseEntity<>(acc,HttpStatus.BAD_REQUEST);
		}
	}
	
	
	@PutMapping("/account/{accNo}/withdraw")
	public ResponseEntity<String> withdraw(@PathVariable long accNo, @RequestBody BalanceDTO balance){
		String acc=null;
		double amount = balance.getBalance();
		try {
			acc = service.withdraw(accNo,amount);
		}catch(IOException e) {
			return new ResponseEntity<>("Failed to withdraw..",HttpStatus.INTERNAL_SERVER_ERROR);
		}
		if("ok".equals(acc)) {
			return new ResponseEntity<>("withdraw success...",HttpStatus.OK);
		}else {
			return new ResponseEntity<>(acc,HttpStatus.BAD_REQUEST);
		}
	}
	
	
	@DeleteMapping("/account/{accNo}")
	public ResponseEntity<String> deleteAccount(@PathVariable long accNo, @RequestBody PinDTO pinDTO){
		int pin = pinDTO.getPin();
		String account = service.deleteAccount(accNo,pin);
		
		if(account == null) {
			return new ResponseEntity<>("account not found..",HttpStatus.NOT_FOUND);
		}
		if("account delete success...".equals(account)) {
			return new ResponseEntity<>(account,HttpStatus.OK);
		}else {
			return new ResponseEntity<>(account,HttpStatus.BAD_REQUEST);
		}
			
	}
	
	
}
