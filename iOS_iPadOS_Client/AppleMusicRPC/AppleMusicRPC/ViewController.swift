//
//  ViewController.swift
//  AppleMusicRPC
//
//  Created by 정구현 on 2021/10/01.
//

import UIKit

class ViewController: UIViewController {
    
    private let imageView: UIImageView = {
        let imageView = UIImageView()
        imageView.contentMode = .scaleAspectFill
        return imageView
    }()
    private let button: UIButton = {
        let button = UIButton()
        button.backgroundColor = .white
        button.setTitle("Connect To Server", for : .normal)
        button.setTitleColor(.black, for : .normal)
        return button
    }()
    private let ipinput: UITextField = {
        let label = UITextField()
        label.text = nil
        label.attributedPlaceholder = NSAttributedString(string: "  Input Server IP", attributes: [.foregroundColor: UIColor.systemGray])
        label.backgroundColor = .white
        label.textColor = .black
        return label
    }()
    
    private let passphraseinput: UITextField = {
        let label = UITextField()
        label.text = nil
        label.attributedPlaceholder = NSAttributedString(string: "  Server Secret Passphrase", attributes: [.foregroundColor: UIColor.systemGray])
        label.backgroundColor = .white
        label.textColor = .black
        return label
    }()
    
    private let labelofgithub: UILabel = {
        let label = UILabel()
        label.text = "https://github.com/justiceserv/AppleMusicDiscordRPC"
        label.textColor = .white
        label.textAlignment = .center
        label.font = UIFont.systemFont(ofSize: UIFont.systemFontSize)
        return label
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let tap = UITapGestureRecognizer(target: self, action: #selector(UIInputViewController.dismissKeyboard))
        view.backgroundColor = .black
        view.addSubview(imageView)
        imageView.frame = CGRect(x: view.center.x - 75, y:view.center.y - 250, width: 150, height: 150)
        view.addSubview(button)
        button.frame = CGRect(x: view.center.x - 100, y: view.center.y + 400, width: 200, height: 60)
        getAppleMusicPhoto()
        view.addSubview(ipinput)
        view.addSubview(passphraseinput)
        button.addTarget(self, action: #selector(TurnedOn), for: .touchUpInside)
        view.addSubview(labelofgithub)
        view.addGestureRecognizer(tap)
    }
    
    @objc func TurnedOn(){
        button.setTitle("Connected To Server", for : .normal)
    }
    
    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        
        button.frame = CGRect(
            x: 30,
            y: view.frame.size.height-250-view.safeAreaInsets.bottom,
            width: view.frame.size.width-60,
            height: 55
        )
        ipinput.frame = CGRect(
            x:30,
            y: view.frame.size.height-420-view.safeAreaInsets.bottom,
            width: view.frame.size.width-60,
            height: 50
        )
        passphraseinput.frame = CGRect(
            x:30,
            y: view.frame.size.height-350-view.safeAreaInsets.bottom,
            width: view.frame.size.width-60,
            height: 50
        )
        labelofgithub.frame = CGRect(
            x: 5,
            y: view.frame.size.height-30-view.safeAreaInsets.bottom,
            width: view.frame.size.width-10,
            height: 12
        )
        ipinput.borderStyle = .roundedRect
        passphraseinput.borderStyle = .roundedRect
    }
    
    func getAppleMusicPhoto() {
        let urlString = "https://i.ibb.co/bg3LvBP/2-2.png"
        let url = URL(string: urlString)!
        guard let data = try? Data(contentsOf: url) else { return }
        imageView.image = UIImage(data: data)
    }
    @objc func dismissKeyboard() {
        view.endEditing(true)
    }
}

